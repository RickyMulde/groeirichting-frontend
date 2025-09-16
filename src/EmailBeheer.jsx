import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function EmailBeheer() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

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

  const showTemplatePreview = (template) => {
    setPreviewTemplate(template);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setPreviewTemplate(null);
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
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Naam</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Doelgroep</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Trigger</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Preview</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Testmail</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {templates.map((template) => (
                <tr key={template.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">{template.naam}</div>
                    <div className="text-sm text-gray-500">{template.omschrijving}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      template.doelgroep === 'werkgever' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {template.doelgroep}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {template.trigger_event}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
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
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => showTemplatePreview(template)}
                      className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                    >
                      Preview
                    </button>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => sendTestEmail(template.id)}
                      className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                    >
                      Testmail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {templates.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Geen email templates gevonden
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && previewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Preview: {previewTemplate.naam}</h2>
              <button
                onClick={closePreview}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Onderwerp:</h3>
                <p className="text-gray-900">{previewTemplate.onderwerp}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700">Doelgroep:</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  previewTemplate.doelgroep === 'werkgever' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {previewTemplate.doelgroep}
                </span>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700">Trigger:</h3>
                <p className="text-gray-900">{previewTemplate.trigger_event}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700">Omschrijving:</h3>
                <p className="text-gray-900">{previewTemplate.omschrijving}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700">HTML Content:</h3>
                <div className="border rounded p-4 bg-gray-50 max-h-64 overflow-y-auto">
                  <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                    {previewTemplate.html_content}
                  </pre>
                </div>
              </div>
              
              {previewTemplate.text_content && (
                <div>
                  <h3 className="font-semibold text-gray-700">Text Content:</h3>
                  <div className="border rounded p-4 bg-gray-50 max-h-32 overflow-y-auto">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                      {previewTemplate.text_content}
                    </pre>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => sendTestEmail(previewTemplate.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Verstuur Testmail
              </button>
              <button
                onClick={closePreview}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmailBeheer;
