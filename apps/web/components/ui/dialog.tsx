'use client';
import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from './button';

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

export function Dialog({
  isOpen: controlledIsOpen,
  onClose,
  title,
  description,
  children,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}) {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = React.useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : uncontrolledIsOpen;

  const setIsOpen = (open: boolean) => {
    setUncontrolledIsOpen(open);
    if (!open && onClose) onClose();
  };

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {title ? (
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="bg-background rounded-xl shadow-xl border w-full max-w-md pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]"
                >
                  <div className="flex items-center justify-between p-6 pb-4">
                    <div>
                      <h2 className="text-xl font-semibold">{title}</h2>
                      {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="self-start">
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="p-6 pt-0 overflow-y-auto">{children}</div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      ) : (
        children
      )}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children, asChild }: { children: React.ReactElement; asChild?: boolean }) {
  const { setIsOpen } = React.useContext(DialogContext);
  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      if (children.props.onClick) children.props.onClick(e);
      setIsOpen(true);
    },
  });
}

export function DialogContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { isOpen, setIsOpen } = React.useContext(DialogContext);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`bg-background rounded-xl shadow-xl border w-full max-w-md pointer-events-auto overflow-hidden flex flex-col max-h-[90vh] p-6 relative ${className}`}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export function DialogHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}>{children}</div>;
}

export function DialogTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h2>;
}
