import styled from "styled-components";
import { Button, Tag, Tabs } from "antd";

export const StyledTag = styled(Tag)`
    cursor: pointer;
`;

export const ProfileContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem;
	min-height: calc(100vh - 200px);
`;

export const ProfileHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2rem;
	flex-wrap: wrap;
	gap: 1rem;
`;

export const ProfileTitle = styled.h1`
	font-size: clamp(2rem, 5vw, 3rem);
	margin: 0;
	color: ${({ theme }) => (theme.theme === "dark" ? "#ffe81f" : "#000000")};
`;

export const BackButton = styled(Button)`
	font-size: 1rem;
`;

export const ProfileContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

export const StyledTabs = styled(Tabs)`
  .ant-tabs-nav::before {
    border-bottom: 1px solid ${({ theme }) =>
        theme.theme === 'dark' ? 'rgba(255, 232, 31, 0.2)' : 'rgba(0, 0, 0, 0.1)'} !important;
  }

  .ant-tabs-tab {
    padding: 12px 16px !important;
    
    &:hover {
      color: ${({ theme }) =>
        theme.theme === 'dark' ? '#ffe81f' : '#1890ff'} !important;
    }
  }

  .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${({ theme }) =>
        theme.theme === 'dark' ? '#ffe81f' : '#1890ff'} !important;
  }

  .ant-tabs-ink-bar {
    background: ${({ theme }) =>
        theme.theme === 'dark' ? '#ffe81f' : '#1890ff'} !important;
  }
`;

export const ProfileSection = styled.section`
	background: ${({ theme }) =>
        theme.theme === "dark" ? "rgba(255, 232, 31, 0.05)" : "rgba(0, 0, 0, 0.02)"};
	border: 1px solid ${({ theme }) =>
        theme.theme === "dark" ? "rgba(255, 232, 31, 0.2)" : "rgba(0, 0, 0, 0.1)"};
	border-radius: 8px;
	padding: 1.5rem;
`;

export const SectionTitle = styled.h2`
	font-size: 1.5rem;
	margin-bottom: 1rem;
	color: ${({ theme }) => (theme.theme === "dark" ? "#ffe81f" : "#000000")};
	border-bottom: 2px solid ${({ theme }) =>
        theme.theme === "dark" ? "#ffe81f" : "#000000"};
	padding-bottom: 0.5rem;
`;

export const LoadingWrapper = styled.div`
    text-align: center;
    padding: 4rem;
`;

export const ErrorButton = styled(Button)`
    margin-top: 1rem;
`;

export const Capitalized = styled.span`
    text-transform: capitalize;
`;

export const ResourceTagsWrapper = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;

export const ResourceListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const CrawlBox = styled.div`
    padding: 1rem;
    background: ${({ theme }) =>
        theme.theme === "dark" ? "rgba(255, 232, 31, 0.05)" : "rgba(0, 0, 0, 0.02)"};
    border: 1px solid ${({ theme }) =>
        theme.theme === "dark" ? "rgba(255, 232, 31, 0.2)" : "rgba(0, 0, 0, 0.1)"};
    border-radius: 8px;
    maxHeight: 300px;
    overflow-y: auto;
    font-style: italic;
    line-height: 1.6;
    color: ${({ theme }) => (theme.theme === "dark" ? "#ffffff" : "#333333")};
`;

export const ModalTitle = styled.span`
    font-size: 1.5rem;
    display: inline-block;
    width: 100%;
`;

export const ProfileAvatar = styled.div`
    width: 180px;
    height: 250px;
    border-radius: 8px;
    overflow: hidden;
    border: 3px solid ${({ theme }) =>
        theme.theme === "dark" ? "#ffe81f" : "#1890ff"};
    flex-shrink: 0;
    background: ${({ theme }) =>
        theme.theme === "dark" ? "rgba(255, 232, 31, 0.1)" : "rgba(24, 144, 255, 0.1)"};
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .anticon {
        font-size: 60px;
        color: ${({ theme }) =>
        theme.theme === "dark" ? "#ffe81f" : "#1890ff"};
    }
`;

export const ProfileAvatarPlaceholder = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) =>
        theme.theme === "dark" ? "#ffe81f" : "#1890ff"};
`;

export const ProfileHeaderContent = styled.div`
    display: flex;
    gap: 24px;
    align-items: flex-start;
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
`;

export const ProfileBasicInfoContainer = styled.div`
    display: flex;
    gap: 24px;
    align-items: flex-start;
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;
