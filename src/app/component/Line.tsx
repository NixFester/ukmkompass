export interface ILineProps {
  kelas?: string;
  width?: string;
}

export default function Line( { kelas, width }: ILineProps) {
  return (
    <div
      className={` ${kelas ? kelas : " py-2.5"} border border-gray-200  sm:px-4 rounded shadow bg-rose-400 ${width} `}
    ></div>
  );
};

