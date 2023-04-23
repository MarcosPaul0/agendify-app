import { BusinessCard } from '@components/BusinessCard';
import { Container } from '@components/Container';
import { ScreenTitle } from '@components/ScreenTitle';
import { ScrollView } from 'react-native';

export default function MyBusiness() {
  return (
    <Container>
      <ScreenTitle text="Meus negócios" />

      <ScrollView className="w-full">
        <BusinessCard
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
        <BusinessCard
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
        <BusinessCard
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
      </ScrollView>
    </Container>
  );
}
