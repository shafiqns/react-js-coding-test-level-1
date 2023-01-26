import React, { useRef } from "react";
import './DetailCard.css';
import { useReactToPrint } from "react-to-print";

const DetailCard = (props) => {
  const printRef = useRef(null); // ref to point when print pdf is triggered
	const name = props?.detail?.name;
	const image = props?.detail?.sprites?.front_default;
	const detailStats = props?.detail?.stats;

  const onDownloadPdf = useReactToPrint({
    content: () => printRef.current
  });

	const renderStatsTable = (stats) => (
		<div className="table-wrapper">
			<table>
				<tr>
					<th>Name</th>
					<th>Base Stats</th>
				</tr>
				{stats.map((stat, index) => (
					<tr key={index}>
						<td>{stat.stat.name}</td>
						<td>{stat.base_stat}</td>
					</tr>
				))}
			</table>
		</div>
	);

	const renderBarChart = (stats) => (
		<div className="barchart-wrapper">
			<table>
				{stats.map((stat, index) => (
					<tr key={index}>
						<td>{stat.stat.name}</td>
						<td>
							<div className="bar-box">
								<div className="progress-bar" style={{ width: `${stat?.base_stat}%` }} />
							</div>
						</td>
					</tr>
				))}
			</table>
		</div>
	);

	return (
		<div ref={printRef} className="card-container">
			<span className="pokemon-name">{name}</span>
			<div className="top-content">
				<img className="pokemon-img" src={image} alt={name} />
				{renderStatsTable(detailStats)}
			</div>
			{renderBarChart(detailStats)}
      <button onClick={onDownloadPdf}>Download As PDF</button>
		</div>
	);
};

export default DetailCard;
