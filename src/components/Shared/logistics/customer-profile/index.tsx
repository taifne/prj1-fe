import Image from 'next/image';
import cn from '@/utils/class-names';
import UserInfo from '@/components/Shared/logistics/customer-profile/user-info';
import RecentPayments from '@/components/Shared/logistics/customer-profile/recent-payments';
import RecentShipments from '@/components/Shared/logistics/customer-profile/recent-shipments';
import PersonalInformation from '@/components/Shared/logistics/customer-profile/personal-info';
import { getRandomArrayElement } from '@/utils/get-random-array-element';

interface CustomerProfileProps {
  className?: string;
}

export default function CustomerProfile({ className }: CustomerProfileProps) {
  const coverPhoto = getRandomArrayElement([
    '1648583076906-60338fa01f07',
    '1655962342982-57cae2d061cf',
  ]);

  return (
    <div className={cn('@container', className)}>
      <figure className="relative -mx-6 flex h-[150px] items-end justify-end bg-gray-50  bg-gradient-to-r from-[#F8E1AF] to-[#F6CFCF] @5xl:h-[200px] 3xl:-mx-8 3xl:h-[250px] 4xl:-mx-10 4xl:h-[300px]">
        <Image
          alt="Mountains"
          src={`https://images.unsplash.com/photo-${coverPhoto}?auto=format&fit=crop&w=1920&q=80`}
          // placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </figure>
      <UserInfo />
      <PersonalInformation />
      <RecentShipments />
      <RecentPayments />
    </div>
  );
}
