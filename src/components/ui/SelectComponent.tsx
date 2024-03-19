const SelectComponent = ({ id, options, value, onChange, label }) => {
    return (<>
        <label
            className="m-2  text-sm font-medium text-white dark:text-white"
            htmlFor={id}
        >
            {label}{" "}
        </label>
        <select
            id={id}
            value={value}
            className="h-4/7 w-1/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => onChange(e.target.value)}
        >
            {options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    </>
    );
}

export default SelectComponent;