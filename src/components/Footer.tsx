import OptimizedImage from '@/components/OptimizedImage';

export default function Footer() {
  return (
    <footer className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Footer Card */}
        <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 lg:p-16 border border-gray-200">
          {/* Footer Links - Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Left Column */}
            <div className="grid grid-cols-2 gap-8">
              {/* Product */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Product</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="/prestarts" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                      Pre-Starts
                    </a>
                  </li>
                  <li>
                    <a href="/timesheets" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                      Timesheets
                    </a>
                  </li>
                  <li>
                    <a href="/cost-tracking" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                      Cost Tracking
                    </a>
                  </li>
                  <li>
                    <a href="/logbook" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                      Plant Hire Logbooks
                    </a>
                  </li>
                  <li>
                    <a href="/crank-ai" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                      Crank.ai
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="/guides" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                      Guides
                    </a>
                  </li>
                  <li>
                    <a href="/video-tutorials" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                      Video Tutorials
                    </a>
                  </li>
                  <li>
                    <a href="/affiliate-partners" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                      Affiliate Partners
                    </a>
                  </li>
                  <li>
                    <a href="/crank-ai-cheat-sheet" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                      Crank.ai Cheat Sheet
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="grid grid-cols-2 gap-8">
              {/* Policies */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Policies</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="/terms" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Support</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="/support" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                      Support & Feedback
                    </a>
                  </li>
                  <li>
                    <a href="tel:1300071577" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                      1300 071 577
                    </a>
                  </li>
                  <li>
                    <a href="mailto:support@civdocs.com.au" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                      support@civdocs.com.au
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-gray-500 text-sm text-center">
              © 2026 CivDocs. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}







