type StateSelectOptionType = {
    id: number | null,
    updateFunction?: (id: number | null) => void,
    optionName: string
}

const StateSelectOption = ({id, updateFunction, optionName}:StateSelectOptionType) => {
  return (
    <div className="cursor-pointer" onClick={() => updateFunction!(id)}>{optionName}</div>
  )
}

export default StateSelectOption