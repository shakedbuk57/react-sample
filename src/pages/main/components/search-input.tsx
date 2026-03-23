import { clsx } from 'clsx';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...'
}: SearchInputProps) {
  return (
    <div className='flex items-center gap-2 border rounded px-3 py-2 bg-slate-900 w-full max-w-xs'>
      <span className='text-slate-400'>🔍</span>
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='flex-1 bg-transparent outline-none text-white placeholder-slate-400'
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className='text-slate-400 hover:text-white'
        >
          ✕
        </button>
      )}
    </div>
  );
}
