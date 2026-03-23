import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

const components: Components = {
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4 scroll-mt-24">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{children}</h3>
  ),
  p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4 text-[17px]">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 text-[17px]">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700 text-[17px]">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-[#F97316] font-medium underline underline-offset-2 hover:text-[#EA580C]"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-10 border-gray-200" />,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-[#F97316]/40 pl-4 italic text-gray-600 my-4">{children}</blockquote>
  ),
};

export function BlogMarkdown({ content }: { content: string }) {
  return (
    <div className="blog-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
