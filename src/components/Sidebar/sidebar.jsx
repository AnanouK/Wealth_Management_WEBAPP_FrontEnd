import "./sidebar.css";
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
import { Link } from "react-router-dom";
//import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Tableau de bord</h3>
          <ul className="sidebarList">

            <li className="sidebarListItem active ">
              <LineStyle className="sidebarIcon" />
              Accueil

            </li>

            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Investissements
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Simulateur
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
