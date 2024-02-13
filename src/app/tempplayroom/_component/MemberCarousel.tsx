import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function MemberCarousel() {
  const member = [1, 2, 3, 4];

  return (
    <div className="my-8">
      <div className="flex items-center">
        <ChevronLeftIcon className="fill-gray-200 size-24" />
        {member.map((value, key) => {
          return (
            <div
              key={key}
              className="shrink-0 bg-gray-200 rounded-2xl w-[20rem] h-[12rem] mx-4"
            ></div>
          );
        })}
        <ChevronRightIcon className="fill-gray-200 size-24" />
      </div>
    </div>
  );
}
