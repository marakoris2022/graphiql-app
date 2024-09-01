import { useEffect, useState } from "react";

const getVariablesFromLS = () => {
  try {
    const variablesStringFromLS = localStorage.getItem("RESTVariables");
    return variablesStringFromLS ? JSON.parse(variablesStringFromLS) : [];
  } catch (error) {
    console.error("Ошибка при получении данных из localStorage:", error);
    return [];
  }
};

export const Variables = () => {
  const [variables, setVariables] = useState<string[][]>([]);
  const [didMount, setDidMount] = useState(false);

  function handleDelete(indexToDelete: number) {
    setVariables((prevState) => {
      return prevState.filter((_, index) => index !== indexToDelete);
    });
  }

  function handleAdd() {
    setVariables((state) => [...state, ["", ""]]);
  }

  function handleChange(index: number, value: string, cell: number) {
    setVariables((prevState) => {
      const newState = [...prevState];
      newState[index][cell] = value;
      return newState;
    });
  }

  useEffect(() => {
    setVariables(getVariablesFromLS);
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      localStorage.setItem("RESTVariables", JSON.stringify(variables));
    }
  }, [didMount, variables]);

  return (
    <div>
      <div>
        <h5>Variables:</h5>
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>

      {variables.map((_, index) => {
        return (
          <div key={index}>
            <input
              value={variables[index][0]}
              onChange={(e) => handleChange(index, e.target.value, 0)}
              placeholder="key"
            />

            <input
              value={variables[index][1]}
              onChange={(e) => handleChange(index, e.target.value, 1)}
              placeholder="value"
            />

            <button type="button" onClick={() => handleDelete(index)}>
              Del
            </button>
          </div>
        );
      })}
    </div>
  );
};
