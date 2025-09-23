// Test file voor filterInput utilities
import { sanitizeInput, safeDecodeHtmlEntities, validateInput, containsSensitiveInfo } from '../filterInput.js';

// Test sanitizeInput functie
console.log('Testing sanitizeInput:');
console.log('Input: <script>alert("xss")</script>');
console.log('Output:', sanitizeInput('<script>alert("xss")</script>'));
console.log('Expected: &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');

// Test safeDecodeHtmlEntities functie
console.log('\nTesting safeDecodeHtmlEntities:');
console.log('Input: &lt;div&gt;Hello &amp; welcome&lt;/div&gt;');
console.log('Output:', safeDecodeHtmlEntities('&lt;div&gt;Hello &amp; welcome&lt;/div&gt;'));
console.log('Expected: <div>Hello & welcome</div>');

// Test validateInput functie
console.log('\nTesting validateInput:');
console.log('Valid input:', validateInput('Hello world'));
console.log('HTML tags (should be OK):', validateInput('<p>Dit is een paragraaf</p>'));
console.log('Script input (should be blocked):', validateInput('<script>alert("xss")</script>'));
console.log('Long input (5001 chars):', validateInput('a'.repeat(5001)));
console.log('Normal long text (4000 chars):', validateInput('Dit is een lang verhaal. '.repeat(160)));

// Test containsSensitiveInfo functie
console.log('\nTesting containsSensitiveInfo:');
console.log('Normal text:', containsSensitiveInfo('Dit is een normale tekst'));
console.log('Email detected:', containsSensitiveInfo('Mijn email is test@example.com'));
console.log('Name detected:', containsSensitiveInfo('Mijn naam is Jan'));

export { sanitizeInput, safeDecodeHtmlEntities, validateInput, containsSensitiveInfo };
