export default function PrivacyPolicy({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-cook-red transition-colors mb-6 text-sm"
        >
          ← Back to Home
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: February 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Overview</h2>
              <p>
                USC Cooked Scale ("we", "our", or "the Service") is an independent student project created
                for educational purposes. This Privacy Policy explains how we handle information when you
                use our service.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                <p className="font-semibold text-yellow-900">Important:</p>
                <p className="text-sm text-yellow-800">
                  This is a student project with no commercial intent. We are not affiliated with the
                  University of Southern California (USC), RateMyProfessors, Reddit, or any other
                  third-party service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.1 Information You Provide</h3>
              <p>When you use our service, you may provide:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Course names and numbers</li>
                <li>Professor names</li>
                <li>Schedule information (if you upload a PDF or image)</li>
              </ul>
              <p className="mt-4">
                <strong>Data Storage:</strong> We do NOT store any of the information you provide. All
                processing is done in real-time, and data is discarded after your session ends.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.2 Automatically Collected Information</h3>
              <p>Like most websites, we may automatically collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Browser type and version</li>
                <li>Basic usage statistics (via hosting provider)</li>
                <li>Error logs (for debugging purposes only)</li>
              </ul>
              <p className="mt-4">
                We do NOT use cookies, tracking pixels, or analytics services to track users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. How We Use Information</h2>
              <p>We use the information you provide solely to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Generate your schedule difficulty analysis</li>
                <li>Query third-party data sources (RateMyProfessors, Reddit, etc.)</li>
                <li>Provide AI-powered insights via Claude API</li>
                <li>Debug technical issues</li>
              </ul>
              <p className="mt-4">
                We do NOT sell, rent, or share your information with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Third-Party Services</h2>
              <p>Our service queries the following third-party sources:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>RateMyProfessors:</strong> To retrieve professor ratings and reviews</li>
                <li><strong>Reddit:</strong> To find relevant student discussions</li>
                <li><strong>Anthropic (Claude AI):</strong> To process and analyze schedule data</li>
              </ul>
              <p className="mt-4">
                When you use our service, professor names and course information are sent to these services.
                Please review their respective privacy policies:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><a href="https://www.ratemyprofessors.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cook-red hover:underline">RateMyProfessors Privacy Policy</a></li>
                <li><a href="https://www.reddit.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-cook-red hover:underline">Reddit Privacy Policy</a></li>
                <li><a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-cook-red hover:underline">Anthropic Privacy Policy</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Data Security</h2>
              <p>
                We implement reasonable security measures to protect data in transit. However, as a student
                project with limited resources, we cannot guarantee absolute security. Please do not upload
                sensitive personal information beyond course schedules.
              </p>
              <p className="mt-4">
                <strong>Important:</strong> Do not upload documents containing Social Security numbers,
                student IDs, financial information, or other sensitive personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Data Retention</h2>
              <p>
                We do NOT store your schedule data. All information is processed in real-time and discarded
                after analysis. Our hosting provider (Vercel) may retain server logs for a limited time for
                operational purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Your Rights</h2>
              <p>Since we don't store personal data, there is no data to access, correct, or delete. Each
              session is independent and temporary.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Children's Privacy</h2>
              <p>
                Our service is intended for college students. We do not knowingly collect information from
                anyone under 13 years of age.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page
                with an updated "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Contact</h2>
              <p>
                This is a student project. For questions or concerns about this Privacy Policy, you can
                reach out through the contact information provided on the developer's website.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
              <p className="text-sm">
                This is an independent student project created for educational purposes. We are not
                affiliated with, endorsed by, or connected to the University of Southern California (USC),
                RateMyProfessors, Reddit, or any other third-party service mentioned. "USC" and "University
                of Southern California" are trademarks of the University of Southern California.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
