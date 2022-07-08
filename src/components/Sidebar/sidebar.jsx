import "./sidebar.css";
import { Link } from 'react-router-dom'
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@mui/icons-material";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Tableau de bord</h3>
          <ul className="sidebarList">

            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              <Link to="/" className="sidetext">Accueil</Link> 

            </li>

            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              <Link to="/investments" className="sidetext">Investissements</Link> 
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              <Link to="/simulateur" className="sidetext">Simulateur(soon)</Link> 
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
