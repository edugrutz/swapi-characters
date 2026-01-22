import styled from "styled-components";

export const ModalContent = styled.div`
	display: flex;
	gap: 24px;
	align-items: flex-start;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: center;
	}
`;

export const ModalImageContainer = styled.div`
	flex-shrink: 0;
`;

export const ModalDetailsContainer = styled.div`
	flex: 1;
	min-width: 0;
`;

export const ModalImage = styled.img`
	width: 200px;
	height: 280px;
	border-radius: 8px;
	object-fit: cover;
	border: 3px solid ${({ theme }) =>
        theme.theme === "dark" ? "#ffe81f" : "#ffe81f"};
`;

export const ModalImagePlaceholder = styled.div`
	width: 200px;
	height: 280px;
	border-radius: 8px;
	border: 3px solid ${({ theme }) =>
        theme.theme === "dark" ? "#ffe81f" : "#ffe81f"};
	background: ${({ theme }) =>
        theme.theme === "dark" ? "rgba(255, 232, 31, 0.1)" : "rgba(24, 144, 255, 0.1)"};
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${({ theme }) =>
        theme.theme === "dark" ? "#ffe81f" : "#ffe81f"};
`;