export default function TermsOfService({ onBack }: { onBack: () => void }) {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: February 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using USC Cooked Scale ("the Service"), you agree to be bound by these
                Terms of Service. If you do not agree to these terms, please do not use the Service.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                <p className="font-semibold text-yellow-900">Important Notice:</p>
                <p className="text-sm text-yellow-800">
                  This is an independent student project created for educational purposes only. We are NOT
                  affiliated with, endorsed by, or connected to the University of Southern California (USC),
                  RateMyProfessors, Reddit, or any other institution or service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
              <p>
                USC Cooked Scale is a free, educational tool that analyzes course schedules and provides
                subjective difficulty estimates based on aggregated data from various public sources.
              </p>
              <p className="mt-4">
                <strong>The Service provides:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Schedule difficulty analysis based on algorithmic calculations</li>
                <li>Aggregated data from public sources (RateMyProfessors, Reddit, etc.)</li>
                <li>AI-generated insights and recommendations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Educational Purpose & Limitations</h2>
              <p>
                <strong>This is a student learning project.</strong> The Service is provided "AS IS" for
                educational and informational purposes only.
              </p>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
                <p className="font-semibold text-red-900">Critical Limitations:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-red-800 mt-2">
                  <li><strong>Subjective Estimates:</strong> All difficulty scores are subjective algorithmic
                  estimates and should NOT be considered definitive, official, or authoritative assessments.</li>
                  <li><strong>Data Accuracy:</strong> Data may be incomplete, outdated, incorrect, or
                  unavailable. We cannot guarantee accuracy or completeness.</li>
                  <li><strong>Not Official Guidance:</strong> This Service does NOT provide official academic
                  advising. Always consult with official university advisors for course selection.</li>
                  <li><strong>No Guarantees:</strong> We make no guarantees about the accuracy, reliability,
                  or usefulness of any information provided.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. User Responsibilities</h2>
              <p>By using the Service, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Service for personal, non-commercial educational purposes only</li>
                <li>Not upload sensitive personal information (SSN, financial data, etc.)</li>
                <li>Not use the Service to harass, defame, or harm others</li>
                <li>Not attempt to reverse engineer, hack, or compromise the Service</li>
                <li>Not use automated tools to scrape or abuse the Service</li>
                <li>Verify all information with official university sources before making decisions</li>
                <li>Understand that all results are estimates and not guarantees</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Intellectual Property & Trademarks</h2>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">5.1 Third-Party Trademarks</h3>
              <p>
                "USC", "University of Southern California", and related marks are trademarks of the
                University of Southern California. Use of these terms is solely for descriptive purposes to
                indicate the target audience of this educational tool.
              </p>
              <p className="mt-4">
                "RateMyProfessors" is a trademark of RateMyProfessors.com. "Reddit" is a trademark of
                Reddit, Inc. These services are referenced solely for descriptive purposes.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">5.2 Our Content</h3>
              <p>
                The Service's design, code, and original content are created by the developer. However, all
                data (professor ratings, reviews, etc.) belongs to their respective sources.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Third-Party Data Sources</h2>
              <p>
                The Service aggregates data from third-party sources including but not limited to
                RateMyProfessors, Reddit, and various public forums. We do not control these sources and
                are not responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The accuracy or completeness of third-party data</li>
                <li>Changes or removal of third-party data</li>
                <li>Availability or uptime of third-party services</li>
                <li>Content or policies of third-party services</li>
              </ul>
              <p className="mt-4">
                By using the Service, you acknowledge that you may be subject to the terms and policies of
                these third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Disclaimers & Limitation of Liability</h2>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">7.1 No Warranties</h3>
              <p>
                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
                INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                OR NON-INFRINGEMENT.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">7.2 Limitation of Liability</h3>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER
                INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE
                LOSSES RESULTING FROM:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Your use or inability to use the Service</li>
                <li>Any inaccurate, incomplete, or misleading information provided by the Service</li>
                <li>Academic decisions made based on the Service's output</li>
                <li>Any unauthorized access to or use of our servers</li>
                <li>Any interruption or cessation of transmission to or from the Service</li>
              </ul>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">7.3 Student Project</h3>
              <p>
                As a student project, this Service has limited resources and support. We cannot guarantee
                continuous availability, accuracy, or maintenance. The Service may be discontinued at any
                time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Rate Limiting & Service Availability</h2>
              <p>
                To prevent abuse and ensure fair access, we may implement rate limiting. This means:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You may be limited in the number of analyses you can perform per day</li>
                <li>Excessive use may result in temporary blocks</li>
                <li>The Service may be temporarily unavailable due to maintenance or issues</li>
              </ul>
              <p className="mt-4">
                We rely on third-party APIs that have their own rate limits. Service disruptions may occur
                if these limits are exceeded.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Data Privacy</h2>
              <p>
                We do NOT store your schedule data. All processing is done in real-time. For more
                information, please review our <a href="#privacy" className="text-cook-red hover:underline">Privacy Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Modifications to Service & Terms</h2>
              <p>
                We reserve the right to modify, suspend, or discontinue the Service at any time without
                notice. We may also update these Terms of Service from time to time. Continued use of the
                Service constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Termination</h2>
              <p>
                We reserve the right to terminate or restrict your access to the Service at any time,
                without notice, for any reason, including but not limited to violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Governing Law</h2>
              <p>
                These Terms shall be governed by the laws of the State of California, United States,
                without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Contact</h2>
              <p>
                This is a student project. For questions about these Terms, you can reach out through the
                contact information provided on the developer's website.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Final Disclaimer</h2>
              <p className="text-sm">
                <strong>THIS IS AN INDEPENDENT STUDENT PROJECT.</strong> We are not affiliated with,
                endorsed by, or connected to the University of Southern California (USC), RateMyProfessors,
                Reddit, or any other institution or service. "USC" and "University of Southern California"
                are trademarks of the University of Southern California, used here solely for descriptive
                purposes.
              </p>
              <p className="text-sm mt-4">
                <strong>USE AT YOUR OWN RISK.</strong> All information is provided for educational purposes
                only. Always verify information with official university sources before making academic
                decisions.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
