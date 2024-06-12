import SignInForm from './sign-in-form';
import AuthWrapperOne from '@/components/Shared/auth-layout/auth-wrapper-one';
import Image from 'next/image';
import UnderlineShape from '@/components/shape/underline';
import { metaObject } from '@/config/site.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
export const metadata = {
  ...metaObject('Sign In'),
};

export default function SignIn() {
  const notify = () => toast("Wow so easy!");
  return (
    <AuthWrapperOne
      title={
        <>
          Welcome back! Please{' '}
          <span className="relative inline-block">
            Sign in to
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36" />
          </span>{' '}
          continue.
        </>
      }
      description=""
      bannerTitle=""
      bannerDescription="."
      isSocialLoginActive={true}
      pageImage={
        <div className="relative mx-auto aspect-[4/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]">
          <img
            src={
              'https://cdn.haitrieu.com/wp-content/uploads/2021/10/Logo-DH-Cong-Nghe-Thong-Tin-UIT-V.png'
            }
            alt="Sign Up Thumbnail"
           
            className="object-cover"
          />
        </div>
      }
    >
      <SignInForm />
      <button onClick={notify}>Notify!</button>
        <ToastContainer />
    </AuthWrapperOne>
  );
}
