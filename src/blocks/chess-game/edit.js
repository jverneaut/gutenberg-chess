import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import {
	ComboboxControl,
	Flex,
	FlexBlock,
	FlexItem,
	PanelBody,
	Placeholder,
	Spinner,
} from "@wordpress/components";
import { useEntityRecords } from "@wordpress/core-data";
import { useEffect, useMemo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

import ChessGameProvider from "../../contexts/ChessGameContext";
import { getGameResultFromMoves } from "../../utils/player-status";
const PLAYER_QUERY = {
	who: "authors",
	per_page: 100,
	_fields: "id,name,slug,avatar_urls",
};
const avatarStyle = {
	width: "28px",
	height: "28px",
	borderRadius: "999px",
	objectFit: "cover",
	flexShrink: 0,
};
const fallbackAvatarStyle = {
	...avatarStyle,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	background: "#1d2327",
	color: "#fff",
	fontSize: "12px",
	fontWeight: 600,
};
const optionSecondaryTextStyle = {
	color: "inherit",
	fontSize: "12px",
	lineHeight: 1.3,
	opacity: 0.75,
};

const getAvatarUrl = (user) =>
	user?.avatar_urls?.["48"] ||
	user?.avatar_urls?.[48] ||
	user?.avatar_urls?.["24"] ||
	user?.avatar_urls?.[24] ||
	"";

const renderAvatar = (user) => {
	const avatarUrl = getAvatarUrl(user);

	if (avatarUrl) {
		return <img alt="" src={avatarUrl} style={avatarStyle} />;
	}

	return (
		<div aria-hidden="true" style={fallbackAvatarStyle}>
			{(user?.name || user?.slug || "?").slice(0, 1).toUpperCase()}
		</div>
	);
};

const renderUserOption = ({ item }) => {
	if (!item.value) {
		return <span>{item.label}</span>;
	}

	return (
		<Flex>
			<FlexItem>{renderAvatar(item)}</FlexItem>
			<FlexBlock>
				<div>{item.label}</div>
				<div
					className="gc-chess-player-option-meta"
					style={optionSecondaryTextStyle}
				>
					@{item.slug}
				</div>
			</FlexBlock>
		</Flex>
	);
};
const getUserIdFromOptionValue = (value, users) => {
	if (!value) {
		return null;
	}

	const user = users.find(({ id }) => String(id) === value);

	return user?.id || null;
};
const mapUsersToPlayerOptions = (users) =>
	users.map((user) => ({
		value: String(user.id),
		label: user.name || user.slug,
		slug: user.slug,
		avatar_urls: user.avatar_urls,
	}));

const PlayerComboboxControl = ({
	label,
	selectedPlayerId,
	options,
	users,
	onPlayerSelect,
}) => (
	<ComboboxControl
		__next40pxDefaultSize
		className="gc-chess-player-combobox"
		label={label}
		options={options}
		value={selectedPlayerId ? String(selectedPlayerId) : ""}
		onChange={(value) => {
			const selectedUserId = getUserIdFromOptionValue(value, users);

			if (!selectedUserId) {
				return;
			}

			onPlayerSelect(selectedUserId);
		}}
		__experimentalRenderItem={renderUserOption}
	/>
);

const PlayerSelectionControls = ({
	attributes,
	isResolvingUsers,
	playerOptions,
	setAttributes,
	users,
}) => {
	if (isResolvingUsers) {
		return <Spinner />;
	}

	return (
		<>
			<PlayerComboboxControl
				label={__("White player", "gutenberg-chess")}
				options={playerOptions}
				users={users}
				selectedPlayerId={attributes.whitePlayerId}
				onPlayerSelect={(selectedUserId) =>
					setAttributes({
						whitePlayerId: selectedUserId,
					})
				}
			/>
			<div style={{ height: "12px" }} />
			<PlayerComboboxControl
				label={__("Black player", "gutenberg-chess")}
				options={playerOptions}
				users={users}
				selectedPlayerId={attributes.blackPlayerId}
				onPlayerSelect={(selectedUserId) =>
					setAttributes({
						blackPlayerId: selectedUserId,
					})
				}
			/>
		</>
	);
};

const Edit = ({ attributes, setAttributes }) => {
	const moves = useMemo(
		() => (Array.isArray(attributes.moves) ? attributes.moves : []),
		[attributes.moves],
	);
	const computedGameResult = useMemo(
		() => getGameResultFromMoves(moves),
		[moves],
	);
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps);
	const { records: userRecords, isResolving: isResolvingUsers } =
		useEntityRecords("root", "user", PLAYER_QUERY);
	const users = Array.isArray(userRecords) ? userRecords : [];
	const playerOptions = mapUsersToPlayerOptions(users);
	const needsPlayerSelection =
		!attributes.whitePlayerId || !attributes.blackPlayerId;
	useEffect(() => {
		const currentGameResult =
			typeof attributes.gameResult === "string" ? attributes.gameResult : "";

		if (currentGameResult === computedGameResult) {
			return;
		}

		setAttributes({
			gameResult: computedGameResult,
		});
	}, [attributes.gameResult, computedGameResult, setAttributes]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Players", "gutenberg-chess")} initialOpen={true}>
					<PlayerSelectionControls
						attributes={attributes}
						isResolvingUsers={isResolvingUsers}
						playerOptions={playerOptions}
						setAttributes={setAttributes}
						users={users}
					/>
				</PanelBody>
			</InspectorControls>
			<ChessGameProvider
				moves={moves}
				onMovesChange={(nextMoves) => setAttributes({ moves: nextMoves })}
				allowDragging
			>
				{needsPlayerSelection ? (
					<div {...blockProps}>
						<Placeholder
							icon="games"
							label={__("Set up game", "gutenberg-chess")}
							instructions={__(
								"Choose both players to start this chess game.",
								"gutenberg-chess",
							)}
						>
							<PlayerSelectionControls
								attributes={attributes}
								isResolvingUsers={isResolvingUsers}
								playerOptions={playerOptions}
								setAttributes={setAttributes}
								users={users}
							/>
						</Placeholder>
					</div>
				) : (
					<div {...innerBlocksProps} />
				)}
			</ChessGameProvider>
		</>
	);
};

export default Edit;
