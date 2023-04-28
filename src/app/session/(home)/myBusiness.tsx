import { BusinessCard } from '@components/BusinessCard';
import { Container } from '@components/Container';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { ScrollView } from 'react-native';

export default function MyBusiness() {
  return (
    <Container>
      <ScrollView className="w-full px-6">
        <BusinessCard
          redirectTo={APP_ROUTES.HOME}
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
        <BusinessCard
          redirectTo={APP_ROUTES.HOME}
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
        <BusinessCard
          redirectTo={APP_ROUTES.HOME}
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
      </ScrollView>
    </Container>
  );
}
