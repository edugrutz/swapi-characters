import styled from "styled-components";
import { ManOutlined, WomanOutlined, QuestionOutlined } from "@ant-design/icons";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const SearchGrid = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const MaleIcon = styled(ManOutlined)`
    color: #1890ff;
    margin-right: 8px;
`;

export const FemaleIcon = styled(WomanOutlined)`
    color: #eb2f96;
    margin-right: 8px;
`;

export const UnknownIcon = styled(QuestionOutlined)`
    color: #8c8c8c;
    margin-right: 8px;
`;