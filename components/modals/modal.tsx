import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useCallback } from "react";

interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
    disabled?: boolean;
    title?: string;
    body?: React.ReactElement;
    onAction: () => void;
    actionLabel?: string;
    footerContent?: React.ReactElement;
};

export function Modal({
    isOpen,
    onClose,
    onOpen,
    disabled,
    title,
    body,
    onAction,
    actionLabel,
    footerContent
}: ModalProps) {
    const handleOnAction = useCallback(() => {
        if (disabled) return;

        onAction();
    }, [onAction, disabled]);

    if (!isOpen) {
        return null;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="border-none">
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <div>
                    {body}
                </div>

                <DialogFooter className="mt-8">
                    <Button
                        disabled={disabled}
                        onClick={handleOnAction}
                        type="submit"
                        className="rounded-full w-full font-bold"
                    >
                        {actionLabel}
                    </Button>
                </DialogFooter>

                {footerContent}
            </DialogContent>
        </Dialog>
    )
}
