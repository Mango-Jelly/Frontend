import BackButton from '@/app/_component/BackButton';
import ScenarioInfo from './ScenarioInfo';
import ScenarioDialog from './ScenarioDialog';

import { scriptInfo } from '@/data/DummyScript';
import { getScript } from '@/api/script';

type Props = {
  id: number;
};

export default async function Scenario({ id }: Props) {
  // let scriptInfo;

  // try {
  //   const fetchedData = await getScript(id);
  //   scriptInfo = fetchedData.data;
  // } catch (error) {
  //   console.error('대본 가져오기 에러', error);
  // }

  return (
    <div className='flex justify-center items-center size-full'>
      <BackButton />
      <ScenarioInfo scriptInfo={scriptInfo} />
      <ScenarioDialog scriptInfo={scriptInfo} />
    </div>
  );
}
