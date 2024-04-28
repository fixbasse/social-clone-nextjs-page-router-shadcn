import React, { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Modal } from './modal';
import useLoginModal from '@/hooks/use-login-modal';
import useRegisterModal from '@/hooks/use-register-modal';
import { signIn } from 'next-auth/react';
import { useToast } from '../ui/use-toast';

type InputTypes = {
    email: string;
    password: string;
};

export const LoginModal = () => {
    const { toast } = useToast();
    const loginHook = useLoginModal();
    const registerHook = useRegisterModal();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<InputTypes>();

    const onToggle = useCallback(() => {
        if (isLoading) return;

        loginHook.onClose();
        registerHook.onOpen();
    }, [isLoading, loginHook, registerHook]);

    // *
    const onSubmit: SubmitHandler<InputTypes> = async (values) => {
        console.log(values);
        
        try {
            setIsLoading(true);

            await signIn('credentials', {
                ...values
            });
            
            loginHook.onClose();
            toast({ title: 'You are sign in!' });
        } catch (error) {
            console.log(error);
            toast({ title: 'Something went wrong, please try again.' });
        } finally {
            setIsLoading(false);
        };
    };

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Input
                placeholder='Email'
                type='email'
                {...register('email', { required: true })}
                disabled={isLoading}
            />

            <Input
                placeholder='Password'
                type='password'
                {...register('password', { required: true })}
                disabled={isLoading}
            />
        </div>
    );

    const footerContent = (
        <footer className='flex justify-center text-sm text-muted-foreground'>
            <span className='flex gap-1'>
                No account?
                <button
                    onClick={onToggle}
                    className='underline hover:no-underline text-primary'>
                    Register
                </button>
            </span>
        </footer>
    );

    return (
        <Modal
            isOpen={loginHook.isOpen}
            onClose={loginHook.onClose}
            title='Login'
            trigger='Signin'
            body={bodyContent}
            disabled={isLoading}
            actionLabel='Signin'
            onAction={handleSubmit(onSubmit)}
            footerContent={footerContent}
        />
    )
}
