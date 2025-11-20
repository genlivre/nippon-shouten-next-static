interface FooterProps {
  text?: string;
}

export const Footer: React.FC<FooterProps> = ({ text }) => {
  return (
    <footer className="bg-gray-100 py-6 mt-12 border-t border-gray-200">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 text-sm">
          {text || `© ${new Date().getFullYear()} ボーイズリーグキャンペーン`}
        </p>
      </div>
    </footer>
  );
};
