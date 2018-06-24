import * as React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const s: {[props: string]: string} = require('./PageWrapper.css');


interface IPageWrapperProps {
  children: JSX.Element | JSX.Element[] | string | string[]
}

interface IPageWrapperState {
  navBtn: boolean,
  navBtnDirection: 'top' | 'bottom' | undefined
}

export class PageWrapper extends React.PureComponent<IPageWrapperProps, IPageWrapperState> {
  public mainContentElem: HTMLElement
  public mainContentWrapperElem: HTMLElement

  state: IPageWrapperState = {
    navBtn: false,
    navBtnDirection: undefined
  }

  handleScroll = () => {
    this.setNavBtnDirection();
  }

  handleContentMutation = () => {
    
    this.setNavBtn();
  }

  handleNavBtnClick = () => {
    this.scroll();
  }

  setNavBtn = () => {
    if (!this.mainContentElem) return;
    if (this.mainContentElem.offsetHeight >= this.mainContentElem.parentElement.offsetHeight*2){
      if (this.state.navBtn !== true){
        this.setState({navBtn: true})
      }
    } else {
      if (this.state.navBtn !== false){
        this.setState({navBtn: false})
      }
    }
    this.setNavBtnDirection();
  }

  setNavBtnDirection = () => {
    if (!this.state.navBtn) return;
    if(this.mainContentWrapperElem.scrollTop >= this.mainContentWrapperElem.scrollHeight/2 - this.mainContentWrapperElem.offsetHeight/2){
      if (this.state.navBtnDirection !== 'top'){
        this.setState({navBtnDirection: 'top'});
      }
    } else {
      if (this.state.navBtnDirection !== 'bottom'){
        this.setState({navBtnDirection: 'bottom'});
      }
    }
  }

  scroll = () => {
    if (this.state.navBtnDirection === 'top'){
      this.mainContentWrapperElem.scrollTop = 0
    } else if (this.state.navBtnDirection === 'bottom'){
      this.mainContentWrapperElem.scrollTop = this.mainContentWrapperElem.scrollHeight - this.mainContentWrapperElem.offsetHeight
    }
  }

  componentDidMount() {
    const mutationObserver = new ResizeObserver(this.handleContentMutation);
    mutationObserver.observe(this.mainContentElem);
    this.setNavBtn();
  }

  render() {
    let navBtnClass = s.navBtn;
    if (this.state.navBtnDirection === 'top'){
      navBtnClass += ` ${s.navBtnTop}`;
    } else if (this.state.navBtnDirection === 'bottom'){
      navBtnClass += ` ${s.navBtnBottom}`;
    }
    return (
      <div className={s.wrapper}>
        <div className={s.row}>
          {
            this.state.navBtn ?
              <div className={s.upbtnCol}>
                <button onClick={this.handleNavBtnClick} className={navBtnClass}></button>
              </div> : null
          }
          <div ref={el => this.mainContentWrapperElem = el} onScroll={this.handleScroll} className={s.mainCol}>
            <div ref={el => this.mainContentElem = el} className={s.mainContent}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}