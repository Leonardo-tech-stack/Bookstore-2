import React, { useState } from 'react';
import { Input } from "./styles";

interface CuponBarProps {
  onSearch: (query: string) => void;
}

const CuponBar: React.FC<CuponBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input placeholder="Enter cupon code here" type="text" value={query} onChange={handleChange} />
    </form>
  );
};

export default CuponBar;
