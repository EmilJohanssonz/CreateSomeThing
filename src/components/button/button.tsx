interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
