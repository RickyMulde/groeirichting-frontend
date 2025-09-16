import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function EmailBeheer() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/email-templates`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Fout bij ophalen templates');
      }
      
      setTemplates(data);
    } catch (error) {
      console.error('Error fetching templates:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const sendTestEmail = async (templateId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/test-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          template_id: templateId,
          test_data: {
            voornaam: 'Test',
            bedrijf_naam: 'Test Bedrijf',
            gesprek_datum: '2024-01-15',
            thema_titel: 'Test Thema'
          }
        })
      });
      
      const result = await response.json();
      if (result.success) {
        alert('Testmail verzonden naar info@groeirichting.nl!');
      } else {
        alert('Fout bij verzenden: ' + result.error);
      }
    } catch (error) {
      console.error('Error sending test email:', error);
      alert('Fout bij verzenden testmail');
    }
  };

  const toggleTemplateStatus = async (templateId, currentStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/email-templates/${templateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          is_active: !currentStatus
        })
      });
      
      const result = await response.json();
      if (response.ok) {
        // Update local state
        setTemplates(templates.map(t => 
          t.id === templateId 
            ? { ...t, is_active: !currentStatus }
            : t
        ));
      } else {
        alert('Fout bij bijwerken template: ' + result.error);
      }
    } catch (error) {
      console.error('Error updating template:', error);
      alert('Fout bij bijwerken template');
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Templates laden...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Fout:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="text-2xl font-semibold text-[var(--kleur-primary)] mb-6">Email Beheer</h1>
      
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Naam</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doelgroep</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trigger</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acties</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {templates.map((template) => (
              <tr key={template.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{template.naam}</div>
                  <div className="text-sm text-gray-500">{template.omschrijving}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    template.doelgroep === 'werkgever' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {template.doelgroep}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {template.trigger_event}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleTemplateStatus(template.id, template.is_active)}
                    className={`px-2 py-1 text-xs rounded-full cursor-pointer ${
                      template.is_active 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    {template.is_active ? 'Actief' : 'Inactief'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                  <button
                    onClick={() => sendTestEmail(template.id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Testmail
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    Bewerken
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {templates.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Geen email templates gevonden
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailBeheer;
