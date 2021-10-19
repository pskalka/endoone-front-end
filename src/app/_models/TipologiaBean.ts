import { EgdsBean } from './EgdsBean';
import { ColonscopiaBean } from './ColonscopiaBean';
import { RssBean } from './RssBean';
import { PegBean } from './PegBean';
import { ScreeningBean } from './ScreeningBean';
export class TipologiaBean {
    
    ["jcr:description"]: string;
    egds!: EgdsBean;
    colonscopia!: ColonscopiaBean;
    rss!: RssBean;
    peg!: PegBean;
    screening!: ScreeningBean;
}