'use client';
import { signInWithEmail } from '@/utils/firebaseApi';
import { createValidationSchema, FormUserData } from '@/utils/yupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { RoutePath, toastifyMessage } from '@/utils/utils';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';
import { app } from '@/firebase';
import Loader from '../Loader/Loader';
import { CustomLink } from '../CustomLink/CustomLink';
import { useTranslations } from 'next-intl';
import { useEffect, useTransition } from 'react';

export const SignUpForm = () => {
  const t = useTranslations('signUser');
  const validationSchema = createValidationSchema(t);
  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    context: { isRegistration: true },
  });

  const router = useRouter();
  const [isPending, setTransition] = useTransition();

  useEffect(() => {
    const errorFields = Object.keys(errors) as Array<keyof FormUserData>;

    if (errorFields.length > 0) {
      trigger(errorFields);
    }
  }, [t]);

  const onSubmit = async (data: FormUserData) => {
    setTransition(async () => {
      if (data.email && data.password) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            getAuth(app),
            data.email,
            data.password
          );
          const user = userCredential.user;
          await updateProfile(user, { displayName: data.name });
          await signInWithEmail(data.email, data.password);
          router.push(RoutePath.HOME);
          router.refresh();
          toast.success(t('toastMsgSignUp'), toastifyMessage);
        } catch (error) {
          if (error instanceof Error) {
            toast.error(`${error.message}`, toastifyMessage);
          }
        }
      }
    });
  };

  return (
    <section className="formContainer">
      <CustomLink href={'/'} title={t('main')} />
      <h2>{t('titleSignUp')}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="formUser">
        <div className="formField">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label={t('email')}
                type="email"
                {...field}
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
                sx={{ width: '300px' }}
                FormHelperTextProps={{
                  sx: { maxWidth: '300px' },
                }}
              />
            )}
          ></Controller>
        </div>
        <div className="formField">
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label={t('password')}
                {...field}
                type="password"
                autoComplete="password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
                sx={{ width: '300px' }}
                FormHelperTextProps={{
                  sx: { maxWidth: '300px' },
                }}
              />
            )}
          ></Controller>
        </div>

        <div className="formField">
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label={t('name')}
                {...field}
                type="text"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
                sx={{ width: '300px' }}
                FormHelperTextProps={{
                  sx: { maxWidth: '300px' },
                }}
              />
            )}
          ></Controller>
        </div>

        <Button
          type="submit"
          variant="contained"
          sx={{ width: 'fit-content' }}
          disabled={Object.entries(errors).length > 0 || isSubmitting}
        >
          {t('signUp')}
        </Button>
      </form>
      {(isSubmitting || isPending) && <Loader />}
    </section>
  );
};
