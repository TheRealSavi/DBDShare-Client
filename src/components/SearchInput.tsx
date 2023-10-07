import { Input } from "antd";
import type { SearchProps } from "antd/es/input";

interface SearchInputProps {
  onSearch: SearchProps["onSearch"];
  placeholderText: string;
}

const SearchInput = (props: SearchInputProps) => {
  return (
    <div>
      <Input.Search
        placeholder={props.placeholderText}
        onSearch={props.onSearch}
      />
    </div>
  );
};

export default SearchInput;
