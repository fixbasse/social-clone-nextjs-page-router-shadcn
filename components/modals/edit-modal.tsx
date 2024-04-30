import React, { useCallback, useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Modal } from './modal';
import { useToast } from '../ui/use-toast';
import useEditModal from '@/hooks/use-edit-modal';
import useCurrentUser from '@/hooks/use-current-user';
import axios from 'axios';
import useUser from '@/hooks/use-user';
import { Textarea } from '../ui/textarea';
import { ImageUpload } from '../img-upload';

export const EditModal = () => {
    const { data: currentUser } = useCurrentUser();
    const { data: mutateFetchedUser } = useUser(currentUser?.id);
    const { toast } = useToast();
    const editHook = useEditModal();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [profileImage, setProfileImage] = useState<string>('');
    const [coverImage, setCoverImage] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [bio, setBio] = useState<string>('');

    useEffect(() => {
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage)
    }, [currentUser?.name, currentUser?.username, currentUser?.bio, currentUser?.profileImage, currentUser?.coverImage]);


    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            const res = await axios.patch('/api/edit', {
                name,
                username,
                bio,
                profileImage,
                coverImage
            });
            console.log(res.data);

            mutateFetchedUser();
            editHook.onClose();
            toast({ title: 'Edit!' });
        } catch (error) {
            console.log(error);
            toast({ title: 'Something went wrong, please try again.' });
        } finally {
            setIsLoading(false);
        };
    }, [bio, name, username, profileImage, coverImage, mutateFetchedUser, editHook, toast]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <ImageUpload
                label='Upload profile image'
                disabled={isLoading}
                value={profileImage}
                onChange={(image) => setProfileImage(image)}
            />
            <ImageUpload
                label='Upload cover image'
                disabled={isLoading}
                value={coverImage}
                onChange={(image) => setProfileImage(image)}
            />
            <Input
                type='text'
                value={name}
                disabled={isLoading}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                type='text'
                value={username}
                disabled={isLoading}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Textarea
                value={bio}
                disabled={isLoading}
                className='italic text-muted-foreground'
                onChange={(e) => setBio(e.target.value)}
            />
        </div>
    );

    return (
        <Modal
            isOpen={editHook.isOpen}
            onClose={editHook.onClose}
            title='Edit'
            body={bodyContent}
            disabled={isLoading}
            actionLabel='Edit'
            onAction={onSubmit}
        //   footerContent={footerContent}
        />
    )
}
