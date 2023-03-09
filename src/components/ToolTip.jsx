import { Component } from 'react';

export default class ToolTip extends Component {
  render() {
    const { children, message } = this.props;
    return (
      <div className='relative group flex'>
        {children}
        <span
          className='absolute -bottom-5 transition-all left-1/2 transform -translate-x-1/2 translate-y-1/2
w-fit scale-0 rounded-xl border-2 border-pink-600 bg-white p-2 text-xs text-pink-600 font-medium group-hover:scale-100'>
          {message}
        </span>
      </div>
    );
  }
}
