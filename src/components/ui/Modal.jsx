import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true,
  closeOnOverlayClick = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="fixed inset-0"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      <div
        className={cn(
          "bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-10",
          className,
        )}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-brown-100 rounded-lg transition-colors z-20"
          >
            <X className="w-5 h-5 text-brown-600" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

const ModalHeader = ({ className, children, ...props }) => (
  <div
    className={cn(
      "sticky top-0 bg-white border-b border-brown-200 p-6 rounded-t-xl",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

const ModalContent = ({ className, children, ...props }) => (
  <div className={cn("p-6", className)} {...props}>
    {children}
  </div>
);

const ModalFooter = ({ className, children, ...props }) => (
  <div
    className={cn(
      "border-t border-brown-200 p-6 flex items-center justify-end space-x-3",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export { Modal, ModalHeader, ModalContent, ModalFooter };
