import { Typography } from "antd";
import logo from "../../assets/images/storm.png";

const { Title } = Typography;

export function Header() {
	return (
		<header
			style={{
				display: "flex",
				alignItems: "center",
				gap: "1.5rem",
				padding: "1rem 0",
			}}
		>
			<img
				src={logo}
				alt="Star Wars Logo"
				style={{
					height: "80px",
					width: "auto",
				}}
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<Title
					level={1}
					style={{
						margin: 0,
						fontSize: "3.5rem",
						fontWeight: "bold",
						lineHeight: 1.2,
					}}
				>
					Star Wars Characters
				</Title>
				<Typography.Text
					style={{ color: "#FFE81F", fontSize: "1.2rem", opacity: 0.8 }}
				>
					Explore the vast database of characters from the legendary Star Wars
					saga
				</Typography.Text>
			</div>
		</header>
	);
}
