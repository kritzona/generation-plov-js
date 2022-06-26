import GenerationPlov from '@/generation-plov';
import elementFactory from '@/virtual-dom/element-factory';

new GenerationPlov(
  elementFactory('div', { class: 'test' }, [
    'kek',
    elementFactory('h1', {}, []),
  ]),
  document.getElementById('root')
);

export default {};
