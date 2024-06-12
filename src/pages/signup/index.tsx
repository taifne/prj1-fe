import Image from 'next/image';
import UnderlineShape from '@/components/shape/underline';
import SignUpForm from './sign-up-form';
import AuthWrapperOne from '@/components/Shared/auth-layout/auth-wrapper-one';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Sign Up 1'),
};

export default function SignUp() {
  return (
    <AuthWrapperOne
      title={
        <>
          Chọn UIT chọn để dẫn đầu{' '}
          <span className="relative inline-block">
            ĐĂNG KÍ NGAY!
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-28 text-blue xl:-bottom-1.5 xl:w-36" />
          </span>
        </>
      }
      description="Bằng cách đăng ký, bạn sẽ có quyền truy cập vào nội dung độc quyền, ưu đãi đặc biệt và là người đầu tiên nghe về tin tức và cập nhật thú vị.."
      bannerTitle="Cách đơn giản nhất để quản lý không gian làm việc của bạn."
      bannerDescription=""
      isSocialLoginActive={true}
      pageImage={
        <div className="relative mx-auto aspect-[4/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]">
          <img
            src={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOeKDFO-ooq9FKDMhwERLhmUHW86hm-6tLCW-Zya_UrA&s'
            }
            alt="Sign Up Thumbnail"

            className="object-cover w-full h-full"
          />
        </div>
      }
    >
      <SignUpForm />
    </AuthWrapperOne>
  );
}
