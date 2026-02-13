import React from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  showLineNumbers?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, showLineNumbers = true }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlight = (text: string) => {
    let escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const lines = escaped.split('\n');
    
    const processedLines = lines.map((line, i) => {
      // Line numbers logic could be added here if we rendered row by row
      const commentIndex = line.indexOf('//');
      if (commentIndex !== -1) {
        const codePart = line.substring(0, commentIndex);
        const commentPart = line.substring(commentIndex);
        return processCodePart(codePart) + `<span class="text-gray-400 italic">${commentPart}</span>`;
      }
      return processCodePart(line);
    });

    return processedLines.join('\n');
  };

  const processCodePart = (text: string) => {
    const keywords = ['void', 'int', 'float', 'boolean', 'String', 'new', 'if', 'else', 'for', 'while', 'return', 'class', 'extends', 'true', 'false', 'null'];
    const builtins = ['setup', 'draw', 'size', 'background', 'fill', 'stroke', 'noStroke', 'noFill', 'rect', 'ellipse', 'line', 'width', 'height', 'mouseX', 'mouseY', 'random', 'noise', 'map', 'lerp', 'translate', 'rotate', 'scale', 'pushMatrix', 'popMatrix', 'println', 'color', 'loadImage', 'image', 'PVector', 'sin', 'cos', 'radians', 'dist', 'frameRate', 'smooth', 'noLoop', 'beginShape', 'endShape', 'vertex', 'curveVertex'];

    return text.replace(/\b([a-zA-Z_]\w*)\b/g, (match) => {
      if (keywords.includes(match)) {
        return `<span class="text-[#D32F2F] font-semibold">${match}</span>`; // Red for keywords
      }
      if (builtins.includes(match)) {
        return `<span class="text-[#006699]">${match}</span>`; // Processing Blue for builtins
      }
      return `<span class="text-[#111827]">${match}</span>`; // Dark text for variables
    });
  };

  return (
    <div className="relative group my-8">
      <div className="absolute -top-3 right-4">
        <button 
          onClick={handleCopy}
          className="bg-white border border-gray-200 shadow-sm text-gray-500 hover:text-p5-blue hover:border-p5-blue transition-all px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <Check size={12} className="text-green-600" />
              <span className="text-green-600">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      <div className="bg-[#F9FAFB] border border-gray-200 rounded-lg p-6 overflow-x-auto text-sm font-mono leading-relaxed shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)]">
        <pre>
          <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;