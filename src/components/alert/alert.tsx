interface AlertProps {
  show: boolean;
  message: string;
}

const Alert = ({ show, message }: AlertProps) => {
  if (!show) return null; 

  return <div className="p-4 bg-red-500 text-white rounded">{message}</div>;
};

export default Alert;
