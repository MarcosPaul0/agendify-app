import { BusinessCard } from '@components/BusinessCard';
import { Container } from '@components/Container';
import { ScreenTitle } from '@components/ScreenTitle';
import { SearchInput } from '@components/SearchInput';
import { useState } from 'react';
import { ScrollView } from 'react-native';

export default function SearchBusiness() {
  const [search, setSearch] = useState('');

  function changeSearch(text: string) {
    setSearch(text);
  }

  return (
    <Container>
      <ScreenTitle text="Encontrar serviços" />

      <SearchInput
        search={search}
        changeSearch={changeSearch}
        placeholder="Buscar serviço"
      />

      <ScrollView className="w-full">
        <BusinessCard
          favoriteIsActive
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
        <BusinessCard
          favoriteIsActive
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
        <BusinessCard
          favoriteIsActive
          isFavorite
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
        <BusinessCard
          favoriteIsActive
          isFavorite
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
        <BusinessCard
          favoriteIsActive
          isFavorite
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
        <BusinessCard
          favoriteIsActive
          isFavorite
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
        <BusinessCard
          favoriteIsActive
          isFavorite
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          description="Desenvolvedor web freelancer fullstack. STACK: Nodejs, NestJs, Express, HTML, CSS, React, Nextjs, ReactNative"
          title="Desenvolvimento Web"
        />
        <BusinessCard
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
