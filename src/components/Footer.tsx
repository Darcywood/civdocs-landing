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

          {/* App Store Downloads */}
          <div className="border-t border-gray-200 pt-8 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* App Store Badge */}
              <a
                href="https://apps.apple.com/au/app/civ-docs/id6756803850"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                style={{ height: '40px' }}
              >
                <svg width="20" height="24" viewBox="0 0 20 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] font-light">Download on the</span>
                  <span className="text-sm font-semibold -mt-0.5">App Store</span>
                </div>
              </a>

              {/* Google Play Badge */}
              <a
                href="https://play.google.com/store/apps/details?id=com.civdocs.app&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black border-2 border-white text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                style={{ height: '40px' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Green triangle (top-left) */}
                  <path d="M1 1L1 9L9 1L1 1Z" fill="#48B352"/>
                  {/* Yellow triangle (middle-left) */}
                  <path d="M1 9L1 15L9 9L1 9Z" fill="#FBC02D"/>
                  {/* Red triangle (bottom-left) */}
                  <path d="M1 15L1 23L9 15L1 15Z" fill="#E53935"/>
                  {/* Blue triangle (right side) */}
                  <path d="M9 1L23 12L9 23L9 1Z" fill="#4285F4"/>
                </svg>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[9px] font-normal tracking-wide">GET IT ON</span>
                  <span className="text-base font-medium -mt-0.5">Google Play</span>
                </div>
              </a>
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







