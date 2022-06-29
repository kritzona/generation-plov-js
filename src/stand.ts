import GenerationPlov from '@/generation-plov';
import Header from '@/test-components/header';

new GenerationPlov(
  GenerationPlov.elementFactory(Header, {}, []),
  document.getElementById('root')
);

export default {};
