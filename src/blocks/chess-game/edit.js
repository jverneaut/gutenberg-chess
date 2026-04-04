import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { ComboboxControl, Flex, FlexBlock, FlexItem, PanelBody, Spinner } from "@wordpress/components";
import { useEntityRecords } from "@wordpress/core-data";
import { __ } from "@wordpress/i18n";

import ChessGameProvider from "../../contexts/ChessGameContext";

const TEMPLATE = [
	[
		"core/columns",
		{},
		[
			[
				"core/column",
				{
					width: "66.66%",
				},
				[
					[
						"gutenberg-chess/chess-player",
						{
							playerSide: "black",
						},
					],
					["gutenberg-chess/chess-board"],
					[
						"gutenberg-chess/chess-player",
						{
							playerSide: "white",
						},
					],
				],
			],
			[
				"core/column",
				{
					width: "33.33%",
				},
				[
					[
						"core/group",
						{
							style: {
								spacing: {
									padding: {
										top: "var:preset|spacing|50",
										bottom: "var:preset|spacing|50",
									},
									blockGap: "0",
								},
							},
							fontSize: "small",
							layout: {
								type: "constrained",
							},
						},
						[["gutenberg-chess/chess-moves"]],
					],
				],
			],
		],
	],
];
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
				<div className="gc-chess-player-option-meta" style={optionSecondaryTextStyle}>
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

const Edit = ({ attributes, setAttributes }) => {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: TEMPLATE,
	});
	const {
		records: userRecords,
		isResolving: isResolvingUsers,
	} = useEntityRecords("root", "user", PLAYER_QUERY);
	const users = Array.isArray(userRecords) ? userRecords : [];
	const whitePlayerOptions = [
		...users.map((user) => ({
			value: String(user.id),
			label: user.name || user.slug,
			slug: user.slug,
			avatar_urls: user.avatar_urls,
		})),
	];
	const blackPlayerOptions = [
		...users.map((user) => ({
			value: String(user.id),
			label: user.name || user.slug,
			slug: user.slug,
			avatar_urls: user.avatar_urls,
		})),
	];

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Players", "gutenberg-chess")}
					initialOpen={true}
				>
					{isResolvingUsers ? (
						<Spinner />
					) : (
						<>
							<ComboboxControl
								__next40pxDefaultSize
								className="gc-chess-player-combobox"
								label={__("White player", "gutenberg-chess")}
								options={whitePlayerOptions}
								value={
									attributes.whitePlayerId
										? String(attributes.whitePlayerId)
										: ""
								}
								onChange={(value) => {
									const selectedUserId = getUserIdFromOptionValue(value, users);

									if (!selectedUserId) {
										return;
									}

									setAttributes({
										whitePlayerId: selectedUserId,
									});
								}}
								__experimentalRenderItem={renderUserOption}
							/>
							<div style={{ height: "12px" }} />
							<ComboboxControl
								__next40pxDefaultSize
								className="gc-chess-player-combobox"
								label={__("Black player", "gutenberg-chess")}
								options={blackPlayerOptions}
								value={
									attributes.blackPlayerId
										? String(attributes.blackPlayerId)
										: ""
								}
								onChange={(value) => {
									const selectedUserId = getUserIdFromOptionValue(value, users);

									if (!selectedUserId) {
										return;
									}

									setAttributes({
										blackPlayerId: selectedUserId,
									});
								}}
								__experimentalRenderItem={renderUserOption}
							/>
						</>
					)}
				</PanelBody>
			</InspectorControls>
			<ChessGameProvider
				moves={attributes.moves}
				onMovesChange={(moves) => setAttributes({ moves })}
				allowDragging
			>
				<div {...innerBlocksProps} />
			</ChessGameProvider>
		</>
	);
};

export default Edit;
