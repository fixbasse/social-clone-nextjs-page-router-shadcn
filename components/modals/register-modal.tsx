import React, { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Modal } from './modal';
import useRegisterModal from '@/hooks/use-register-modal';
import useLoginModal from '@/hooks/use-login-modal';
import axios from 'axios';
import { useToast } from '../ui/use-toast';
import { signIn } from 'next-auth/react';

type InputTypes = {
    email: string;
    password: string;
    name: string;
    username: string;
};

export const RegisterModal = () => {
    const { toast } = useToast();
    const registerHook = useRegisterModal();
    const loginHook = useLoginModal();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<InputTypes>();

    const onToggle = useCallback(() => {
        if (isLoading) return;

        registerHook.onClose();
        loginHook.onOpen();
    }, [isLoading, registerHook, loginHook]);

    // *
    const onSubmit: SubmitHandler<InputTypes> = async (values) => {
        try {
            setIsLoading(true);

            const res = await axios.post('/api/register', values)
            console.log(res.data);

            toast({
                title: 'Account has been created!'
            });
        } catch (error) {
            console.log(error);
            toast({
                title: 'Something went wrong, please try again.'
            });
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
            <Input
                placeholder='Name'
                type='text'
                {...register('name', { required: true })}
                disabled={isLoading}
            />
            <Input
                placeholder='Username'
                type='text'
                {...register('username', { required: true })}
                disabled={isLoading}
            />
        </div>
    );

    const footerContent = (
        <footer className='flex justify-center text-sm text-muted-foreground'>
            <span className='flex gap-1'>
                Already have an account?
                <button
                    onClick={onToggle}
                    className='underline hover:no-underline text-primary'>
                    Signin
                </button>
            </span>
        </footer>
    );

    return (
        <Modal
            isOpen={registerHook.isOpen}
            onClose={registerHook.onClose}
            title='Register'
            trigger='Create account'
            body={bodyContent}
            disabled={isLoading}
            actionLabel='Register'
            onAction={handleSubmit(onSubmit)}
            footerContent={footerContent}
        />
    )
}
