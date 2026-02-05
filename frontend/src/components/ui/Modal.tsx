import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl"
};

export default function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`w-full ${sizeMap[size]} rounded-2xl border border-border-subtle bg-bg-card p-6 shadow-modal`}
            role="dialog"
            aria-modal="true"
            aria-label={title || "Modal"}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              {title ? <h3 className="text-lg font-semibold text-white">{title}</h3> : null}
              <button onClick={onClose} className="text-text-muted hover:text-white" aria-label="Close modal">
                ✕
              </button>
            </div>
            <div className="mt-4">{children}</div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
