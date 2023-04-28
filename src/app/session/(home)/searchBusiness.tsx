import { BusinessCard } from '@components/BusinessCard';
import { Container } from '@components/Container';
import { SearchInput } from '@components/SearchInput';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { useState } from 'react';
import { ScrollView } from 'react-native';

export default function SearchBusiness() {
  const [search, setSearch] = useState('');

  function changeSearch(text: string) {
    setSearch(text);
  }

  return (
    <Container>
      <SearchInput
        search={search}
        changeSearch={changeSearch}
        placeholder="Buscar serviço"
      />

      <ScrollView className="w-full px-6">
        <BusinessCard
          redirectTo={APP_ROUTES.HOME}
          favoriteIsActive
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
        <BusinessCard
          redirectTo={APP_ROUTES.HOME}
          favoriteIsActive
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
        <BusinessCard
          redirectTo={APP_ROUTES.HOME}
          favoriteIsActive
          isFavorite
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
        <BusinessCard
          redirectTo={APP_ROUTES.HOME}
          favoriteIsActive
          isFavorite
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
        <BusinessCard
          redirectTo={APP_ROUTES.HOME}
          favoriteIsActive
          isFavorite
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
        <BusinessCard
          redirectTo={APP_ROUTES.HOME}
          favoriteIsActive
          isFavorite
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
        <BusinessCard
          redirectTo={APP_ROUTES.HOME}
          favoriteIsActive
          isFavorite
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
        <BusinessCard
          redirectTo={APP_ROUTES.HOME}
          favoriteIsActive
          isFavorite
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
      </ScrollView>
    </Container>
  );
}
