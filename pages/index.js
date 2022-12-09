import MainLayout from '../src/layouts/MainLayout';

import Dashboard from '../src/components/dashboard';

const Index = () => {
  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
};
export default Index;
export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
