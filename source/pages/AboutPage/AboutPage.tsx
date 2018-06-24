import * as React from 'react';

import {PageWrapper} from 'common-components/PageWrapper/PageWrapper';

const s: {[props: string]: string} = require('./AboutPage.css');


export class AboutPage extends React.Component {
  render() {
    return (
      <PageWrapper>
        <div className={s.wrapper}>
          <div className={s.attribution}>
            <div className={s.attributionLogo}>
              <a href='https://www.themoviedb.org/documentation/api'>
                <img src='https://www.themoviedb.org/static_cache/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg' alt='TMDb logo' />
              </a>
            </div>
            <p className={s.attributionText}>This product uses the <a href='https://www.themoviedb.org/documentation/api'>TMDb API</a> but is not endorsed or certified by TMDb.</p>
          </div>
          <h2 className={s.title}>I built this website</h2>
          <div className={s.description}>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod similique excepturi, perferendis repudiandae sequi distinctio accusamus. Numquam ea architecto sapiente suscipit natus reiciendis maiores aliquid sequi, maxime ut cum, expedita, harum unde ab! Voluptatem temporibus commodi repudiandae quasi, molestiae totam alias consequuntur ratione porro eius dignissimos laudantium voluptas sit eligendi ex tenetur at praesentium nisi esse placeat repellat explicabo? Aliquid ratione minus repudiandae aliquam dicta magnam eveniet perspiciatis, officiis! Expedita possimus dicta voluptatibus natus in dolore, inventore odit incidunt quaerat aspernatur aliquid quibusdam et laboriosam iure, nesciunt ipsam placeat officiis ipsa, neque tempore debitis pariatur earum dignissimos dolores! Atque praesentium, ullam placeat consequuntur soluta voluptate fugiat ad sint, pariatur deleniti error saepe, facilis modi, quam.</p>
            <p>Officia recusandae laboriosam obcaecati enim neque libero earum natus quaerat et error, rerum qui voluptates, nemo! Eaque aut assumenda dignissimos illum pariatur dicta natus, eligendi deserunt quod, maxime delectus, molestiae repellat explicabo corporis? Totam reiciendis illum fugiat fugit, modi atque consectetur necessitatibus porro distinctio, id illo omnis, tempore placeat. Praesentium quibusdam voluptatibus quis rerum alias deserunt ex repudiandae, consequuntur velit totam aspernatur exercitationem minus fuga ab reprehenderit enim dolores tempora. Aliquid a, est sed unde officia aperiam veritatis tempora eaque, eligendi porro harum tenetur, dolorum consequatur voluptatum perspiciatis nihil mollitia vitae.</p>
            <p>Accusantium, iste quos ad, iusto recusandae nobis esse vitae deleniti facere sapiente sint corporis magni alias veritatis earum harum excepturi omnis vero, enim pariatur quasi deserunt a aspernatur tempore nemo. Sit facere accusamus voluptatum porro praesentium, earum, explicabo impedit! Provident doloremque fugit quas placeat commodi quo, consectetur quam. Aut ab eos odit aperiam repudiandae inventore, ipsam, molestiae incidunt minus quod culpa rerum, temporibus nemo error ipsum laudantium magni dicta id corporis deserunt dignissimos reprehenderit. Unde ratione quam similique aspernatur possimus, hic aut saepe iste repudiandae, deleniti voluptates adipisci voluptatibus quibusdam deserunt. Inventore saepe et aspernatur ipsa veritatis impedit corrupti necessitatibus natus. Excepturi labore doloribus at repudiandae molestiae fugit facere dicta accusantium a facilis quae, quos, deserunt quasi dolorem obcaecati soluta quo ratione neque nemo eius, non laudantium perspiciatis consequatur! Nulla cupiditate, perspiciatis praesentium distinctio reiciendis laboriosam adipisci, cumque natus minima accusantium cum sed laborum ipsum aperiam vel ex. Quas nostrum possimus obcaecati natus excepturi dignissimos magni voluptatibus incidunt vitae beatae aliquid dicta in adipisci voluptas necessitatibus facere quam, quidem deleniti minima doloremque aut nemo eveniet doloribus nesciunt. Quis repudiandae id ducimus doloremque labore? Iusto laudantium neque quod vel, reiciendis aperiam sint voluptatum. Illum, pariatur.</p>
          </div>
          <div className={s.rights}>{(new Date()).getFullYear()} All Rights Reserved, if someone care.</div>
        </div>
      </PageWrapper>
    );
  }
}