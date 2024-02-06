import BackButton from '@/app/_component/BackButton';
import ScenarioInfo from './ScenarioInfo';
import ScenarioDialog from './ScenarioDialog';
import { scriptInfo } from '@/data/DummyScript';

type Props = {
  id: string;
};

export default function Scenario({ id }: Props) {
  return (
    <div className='flex justify-center items-center size-full'>
      <BackButton />
      <ScenarioInfo scriptInfo={scriptInfo} />
      <ScenarioDialog scriptInfo={scriptInfo} />
    </div>
  );
}
