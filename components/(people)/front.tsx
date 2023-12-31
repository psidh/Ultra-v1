import frontData from '../../utils/front.js';
import Line from '../line';

interface Person {
  name: string;
  image: string;
  role: string;
}

const people: Person[] = frontData;

const Front: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold my-8 text-center">Our Team</h1>
      <div className="flex items-center justify-center md:space-x-16 h-fit">
        <div className="my-8 md:my-16 flex flex-col items-center justify-between">
          <img
            src="/people/me.jpeg"
            alt="P Sidharth image"
            className="w-32 h-32 md:h-44 md:w-44  object-cover rounded-full mb-4 text-center"
          />
          <h2 className="text-xl font-semibold text-center">
            Philkhana Sidharth
          </h2>
          <p className="text-gray-500 text-center">
            Founder
            <br />
            NextJs & React Developer
          </p>
        </div>
        <div className="my-16 flex flex-col items-center justify-between">
          <img
            src="/people/manas.png"
            alt="Manas Malla image"
            className="w-32 h-32 md:h-44 md:w-44 object-cover rounded-full mb-4 text-center"
          />
          <h2 className="text-xl font-semibold text-center">Manas Malla</h2>
          <p className="text-gray-500 text-center">
            CTO | GDSC Lead <br /> Flutter | Android
          </p>
        </div>
      </div>
      <h1 className="text-2xl md:text-4xl font-bold px-16 text-left ">Front-End</h1>
      <Line />
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-8">
        {people.map((person) => (
          <div
            key={person.name}
            className="p-4 rounded-md shadow-md flex flex-col items-center justify-center"
          >
            <img
              src={person.image}
              alt={person.name}
              className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-full mb-4 text-center"
            />
            <h2 className="text-lg md:text-xl text-gray-300 font-semibold text-center">
              {person.name}
            </h2>
            <p className="text-sm md:text-lg text-gray-500 text-center">
              {person.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Front;
